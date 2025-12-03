import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../providers/request_provider.dart';
import '../../widgets/request_card.dart';

class MyRequestsScreen extends StatefulWidget {
  const MyRequestsScreen({super.key});

  @override
  State<MyRequestsScreen> createState() => _MyRequestsScreenState();
}

class _MyRequestsScreenState extends State<MyRequestsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<RequestProvider>().refreshUserRequests();
    });
  }

  Future<void> _onRefresh() async {
    await context.read<RequestProvider>().refreshUserRequests();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<RequestProvider>();
    final requests = provider.userRequests;

    return Scaffold(
      appBar: AppBar(title: const Text('Taleplerim')),
      body: RefreshIndicator(
        onRefresh: _onRefresh,
        child: provider.isLoading && requests.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : requests.isEmpty
                ? ListView(
                    children: const [
                      SizedBox(height: 200),
                      Center(child: Text('Henuz talep olusturmadiniz.')),
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
