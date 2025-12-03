import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'providers/auth_provider.dart';
import 'screens/admin/admin_home_screen.dart';
import 'screens/admin/admin_login_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/home/home_screen.dart';
import 'screens/requests/my_requests_screen.dart';
import 'screens/requests/request_form_screen.dart';
import 'widgets/loading_overlay.dart';

class AntikaDeposuApp extends StatefulWidget {
  const AntikaDeposuApp({super.key});

  @override
  State<AntikaDeposuApp> createState() => _AntikaDeposuAppState();
}

class _AntikaDeposuAppState extends State<AntikaDeposuApp> {
  late GoRouter _router;

  @override
  void initState() {
    super.initState();
    final authProvider = context.read<AuthProvider>();
    authProvider.initialize();

    _router = GoRouter(
      initialLocation: '/login',
      refreshListenable: authProvider,
      routes: [
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/register',
          builder: (context, state) => const RegisterScreen(),
        ),
        GoRoute(
          path: '/home',
          builder: (context, state) => const HomeScreen(),
        ),
        GoRoute(
          path: '/request',
          builder: (context, state) => const RequestFormScreen(),
        ),
        GoRoute(
          path: '/my-requests',
          builder: (context, state) => const MyRequestsScreen(),
        ),
        GoRoute(
          path: '/admin/login',
          builder: (context, state) => const AdminLoginScreen(),
        ),
        GoRoute(
          path: '/admin/home',
          builder: (context, state) => const AdminHomeScreen(),
        ),
      ],
      redirect: (context, state) {
        final auth = context.read<AuthProvider>();
        final loggingIn = state.matchedLocation == '/login' || state.matchedLocation == '/register';
        final adminLoggingIn = state.matchedLocation == '/admin/login';

        if (!auth.isInitialized) {
          return null;
        }

        if (!auth.isAuthenticated && !loggingIn && !adminLoggingIn) {
          return '/login';
        }

        if (auth.isAuthenticated && loggingIn) {
          return '/home';
        }

        if (auth.isAdmin && loggingIn) {
          return '/admin/home';
        }

        if (state.matchedLocation.startsWith('/admin') && !auth.isAdmin) {
          return '/admin/login';
        }

        return null;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (_, authProvider, __) {
        return MaterialApp.router(
          title: 'Antika Deposu',
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
            useMaterial3: true,
          ),
          routerDelegate: _router.routerDelegate,
          routeInformationParser: _router.routeInformationParser,
          routeInformationProvider: _router.routeInformationProvider,
          builder: (context, child) {
            return LoadingOverlay(
              isLoading: authProvider.isLoading,
              child: child ?? const SizedBox.shrink(),
            );
          },
        );
      },
    );
  }
}
