import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../utils/snackbar_utils.dart';
import '../../utils/validators.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
      );
      if (!mounted) return;
      context.go('/home');
      SnackbarUtils.showSuccess(context, 'Hos geldiniz!');
    } catch (error) {
      SnackbarUtils.showError(context, error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Giris Yap')),
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
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  validator: Validators.email,
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Sifre',
                    prefixIcon: Icon(Icons.lock_outline),
                  ),
                  validator: (value) => Validators.minLength(
                    value,
                    min: 6,
                    fieldName: 'Sifre',
                  ),
                  obscureText: true,
                ),
                const SizedBox(height: 24),
                FilledButton.icon(
                  onPressed: authProvider.isLoading ? null : _submit,
                  icon: const Icon(Icons.login),
                  label: const Text('Giris Yap'),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () => context.go('/register'),
                  child: const Text('Hesabiniz yok mu? Kayit olun'),
                ),
                TextButton(
                  onPressed: () => context.go('/admin/login'),
                  child: const Text('Admin girisi'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
