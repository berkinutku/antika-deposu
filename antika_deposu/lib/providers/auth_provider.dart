import 'package:flutter/foundation.dart';

import '../models/user_model.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  AuthProvider({required this.authService});

  final AuthService authService;

  UserModel? _user;
  String? _token;
  bool _isLoading = false;
  bool _isInitialized = false;

  UserModel? get currentUser => _user;
  bool get isAuthenticated => _token != null && _user != null;
  bool get isAdmin => _user?.isAdmin ?? false;
  bool get isLoading => _isLoading;
  bool get isInitialized => _isInitialized;

  Future<void> initialize() async {
    if (_isInitialized) return;
    _isLoading = true;
    notifyListeners();

    try {
      _token = await authService.getToken();
      _user = await authService.getStoredUser();
    } finally {
      _isInitialized = true;
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> login({
    required String email,
    required String password,
    bool isAdmin = false,
  }) async {
    _setLoading(true);
    try {
      final response = await authService.login(
        email: email,
        password: password,
        isAdmin: isAdmin,
      );
      _user = response.user;
      _token = response.token;
      _setLoading(false);
      return true;
    } catch (_) {
      _setLoading(false);
      rethrow;
    }
  }

  Future<bool> register({
    required String email,
    required String password,
    String? name,
  }) async {
    _setLoading(true);
    try {
      final response = await authService.register(
        email: email,
        password: password,
        name: name,
      );
      _user = response.user;
      _token = response.token;
      _setLoading(false);
      return true;
    } catch (_) {
      _setLoading(false);
      rethrow;
    }
  }

  Future<void> logout() async {
    _setLoading(true);
    await authService.clearToken();
    _user = null;
    _token = null;
    _setLoading(false);
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
