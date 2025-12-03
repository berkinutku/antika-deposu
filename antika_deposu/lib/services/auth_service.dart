import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../models/user_model.dart';
import '../utils/constants.dart';

class AuthService {
  AuthService() : _storage = const FlutterSecureStorage();

  final FlutterSecureStorage _storage;
  static const _tokenKey = 'auth_token';
  static const _roleKey = 'auth_role';
  static const _userKey = 'auth_user';

  Future<AuthResponse> login({
    required String email,
    required String password,
    bool isAdmin = false,
  }) async {
    final endpoint = isAdmin ? adminLoginPath : loginPath;
    final response = await _post(
      '$apiBaseUrl$endpoint',
      body: {
        'email': email,
        'password': password,
      },
    );
    return _handleAuthResponse(response);
  }

  Future<AuthResponse> register({
    required String email,
    required String password,
    String? name,
  }) async {
    final response = await _post(
      '$apiBaseUrl$registerPath',
      body: {
        'email': email,
        'password': password,
        if (name != null && name.isNotEmpty) 'name': name,
      },
    );
    return _handleAuthResponse(response);
  }

  Future<AuthResponse> _handleAuthResponse(http.Response response) async {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final token = data['token'] as String;
      final user = UserModel.fromJson(data['user'] as Map<String, dynamic>);
      await _persistSession(token, user);
      return AuthResponse(user: user, token: token);
    }

    final message = _extractError(response);
    throw AuthException(message);
  }

  Future<void> _persistSession(String token, UserModel user) async {
    await _storage.write(key: _tokenKey, value: token);
    await _storage.write(key: _roleKey, value: user.role);
    await _storage.write(key: _userKey, value: jsonEncode(user.toJson()));
  }

  Future<void> saveToken(String token) => _storage.write(key: _tokenKey, value: token);

  Future<String?> getToken() => _storage.read(key: _tokenKey);

  Future<String?> getRole() => _storage.read(key: _roleKey);

  Future<UserModel?> getStoredUser() async {
    final jsonStr = await _storage.read(key: _userKey);
    if (jsonStr == null) return null;
    try {
      final data = jsonDecode(jsonStr) as Map<String, dynamic>;
      return UserModel.fromJson(data);
    } catch (_) {
      return null;
    }
  }

  Future<void> clearToken() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _roleKey);
    await _storage.delete(key: _userKey);
  }

  Future<UserModel> fetchProfile({required String token}) async {
    final response = await http.get(
      Uri.parse('$apiBaseUrl/profile'),
      headers: _headers(token),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final user = UserModel.fromJson(data['user'] as Map<String, dynamic>);
      await _storage.write(key: _userKey, value: jsonEncode(user.toJson()));
      return user;
    }

    throw AuthException(_extractError(response));
  }

  Map<String, String> _headers(String? token) => {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      };

  Future<http.Response> _post(
    String url, {
    required Map<String, dynamic> body,
    Map<String, String>? headers,
  }) async {
    final response = await http.post(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json',
        ...?headers,
      },
      body: jsonEncode(body),
    );
    return response;
  }

  String _extractError(http.Response response) {
    try {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return data['message']?.toString() ?? 'Bilinmeyen hata olustu.';
    } catch (_) {
      return 'Bilinmeyen hata olustu.';
    }
  }
}

class AuthResponse {
  final UserModel user;
  final String token;

  AuthResponse({required this.user, required this.token});
}

class AuthException implements Exception {
  final String message;

  AuthException(this.message);

  @override
  String toString() => 'AuthException: $message';
}
