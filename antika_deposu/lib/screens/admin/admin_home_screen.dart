import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../providers/request_provider.dart';
import '../../widgets/request_card.dart';

class AdminHomeScreen extends StatefulWidget {
  const AdminHomeScreen({super.key});

  @override
  State<AdminHomeScreen> createState() => _AdminHomeScreenState();
}

class _AdminHomeScreenState extends State<AdminHomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<RequestProvider>().refreshAllRequests();
    });
  }

  Future<void> _refresh() async {
    await context.read<RequestProvider>().refreshAllRequests();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<RequestProvider>();
    final requests = provider.allRequests;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Paneli'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Cikis yap',
            onPressed: () async {
              await context.read<AuthProvider>().logout();
              if (context.mounted) context.go('/admin/login');
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: provider.isLoading && requests.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : requests.isEmpty
                ? ListView(
                    children: const [
                      SizedBox(height: 200),
                      Center(child: Text('Herhangi bir talep bulunamadi.')),
                    ],
                  )
                : ListView.builder(
                    itemCount: requests.length,
                    itemBuilder: (_, index) => RequestCard(request: requests[index]),
                  ),
      ),
    );
  }
}
