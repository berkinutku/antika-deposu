import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'app.dart';
import 'providers/auth_provider.dart';
import 'providers/request_provider.dart';
import 'services/auth_service.dart';
import 'services/request_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final authService = AuthService();
  final requestService = RequestService(authService: authService);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider<AuthProvider>(
          create: (_) => AuthProvider(authService: authService),
        ),
        ChangeNotifierProxyProvider<AuthProvider, RequestProvider>(
          create: (_) => RequestProvider(requestService: requestService),
          update: (_, authProvider, requestProvider) =>
              (requestProvider ?? RequestProvider(requestService: requestService))
                ..setAuthProvider(authProvider),
        ),
      ],
      child: const AntikaDeposuApp(),
    ),
  );
}
