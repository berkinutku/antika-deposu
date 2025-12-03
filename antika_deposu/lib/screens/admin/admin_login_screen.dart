import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../utils/snackbar_utils.dart';
import '../../utils/validators.dart';

class AdminLoginScreen extends StatefulWidget {
  const AdminLoginScreen({super.key});

  @override
  State<AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends State<AdminLoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = context.read<AuthProvider>();
    try {
      await authProvider.login(
        email: _emailController.text.trim(),
        password: _passwordController.text,
        isAdmin: true,
      );
      if (!mounted) return;
      context.go('/admin/home');
      SnackbarUtils.showSuccess(context, 'Admin paneline hos geldiniz');
    } catch (error) {
      SnackbarUtils.showError(context, error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Admin Girisi')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                  validator: Validators.email,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(labelText: 'Sifre'),
                  obscureText: true,
                  validator: (value) => Validators.minLength(
                    value,
                    min: 6,
                    fieldName: 'Sifre',
                  ),
                ),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: authProvider.isLoading ? null : _submit,
                  icon: const Icon(Icons.admin_panel_settings_outlined),
                  label: const Text('Giris Yap'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
