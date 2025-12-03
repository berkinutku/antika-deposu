import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import '../models/request_model.dart';
import '../utils/constants.dart';
import 'auth_service.dart';

class RequestService {
  RequestService({required this.authService});

  final AuthService authService;

  Future<RequestModel> createRequest({
    required String marka,
    required String model,
    required String parcaAdi,
    String? aciklama,
    File? image,
  }) async {
    final token = await authService.getToken();
    if (token == null) {
      throw RequestException('Oturum bulunamadi.');
    }

    http.Response response;

    if (image != null) {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$apiBaseUrl$createRequestPath'),
      )
        ..headers['Authorization'] = 'Bearer $token'
        ..fields['marka'] = marka
        ..fields['model'] = model
        ..fields['parcaAdi'] = parcaAdi
        ..fields['aciklama'] = aciklama ?? ''
        ..files.add(await http.MultipartFile.fromPath('image', image.path));

      final streamed = await request.send();
      response = await http.Response.fromStream(streamed);
    } else {
      response = await http.post(
        Uri.parse('$apiBaseUrl$createRequestPath'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'marka': marka,
          'model': model,
          'parcaAdi': parcaAdi,
          'aciklama': aciklama,
        }),
      );
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return RequestModel.fromJson(data['request'] as Map<String, dynamic>);
    }

    throw RequestException(_extractError(response));
  }

  Future<List<RequestModel>> fetchUserRequests(String userId) async {
    final token = await authService.getToken();
    final response = await http.get(
      Uri.parse('$apiBaseUrl$userRequestsPath/$userId'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final list = data['requests'] as List<dynamic>;
      return list
          .map((item) => RequestModel.fromJson(item as Map<String, dynamic>))
          .toList();
    }

    throw RequestException(_extractError(response));
  }

  Future<List<RequestModel>> fetchAllRequests() async {
    final token = await authService.getToken();
    final response = await http.get(
      Uri.parse('$apiBaseUrl$allRequestsPath'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final list = data['requests'] as List<dynamic>;
      return list
          .map((item) => RequestModel.fromJson(item as Map<String, dynamic>))
          .toList();
    }

    throw RequestException(_extractError(response));
  }

  String _extractError(http.Response response) {
    try {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return data['message']?.toString() ?? 'Istek sirasinda bir hata olustu.';
    } catch (_) {
      return 'Istek sirasinda bir hata olustu.';
    }
  }
}

class RequestException implements Exception {
  final String message;

  RequestException(this.message);

  @override
  String toString() => 'RequestException: $message';
}
