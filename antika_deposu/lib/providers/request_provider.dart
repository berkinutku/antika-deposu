import 'dart:io';

import 'package:flutter/foundation.dart';

import '../models/request_model.dart';
import '../services/request_service.dart';
import 'auth_provider.dart';

class RequestProvider extends ChangeNotifier {
  RequestProvider({required this.requestService});

  final RequestService requestService;

  AuthProvider? _authProvider;
  List<RequestModel> _userRequests = [];
  List<RequestModel> _allRequests = [];
  bool _isSubmitting = false;
  bool _isLoading = false;

  List<RequestModel> get userRequests => _userRequests;
  List<RequestModel> get allRequests => _allRequests;
  bool get isSubmitting => _isSubmitting;
  bool get isLoading => _isLoading;

  void setAuthProvider(AuthProvider provider) {
    _authProvider = provider;
  }

  Future<void> refreshUserRequests() async {
    if (_authProvider?.currentUser == null) return;
    await _withLoading(() async {
      _userRequests = await requestService.fetchUserRequests(
        _authProvider!.currentUser!.id,
      );
    });
  }

  Future<void> refreshAllRequests() async {
    await _withLoading(() async {
      _allRequests = await requestService.fetchAllRequests();
    });
  }

  Future<RequestModel> createRequest({
    required String marka,
    required String model,
    required String parcaAdi,
    String? aciklama,
    File? image,
  }) async {
    _setSubmitting(true);
    try {
      final request = await requestService.createRequest(
        marka: marka,
        model: model,
        parcaAdi: parcaAdi,
        aciklama: aciklama,
        image: image,
      );
      _userRequests = [request, ..._userRequests];
      if (_authProvider?.isAdmin == true) {
        _allRequests = [request, ..._allRequests];
      }
      _setSubmitting(false);
      return request;
    } catch (_) {
      _setSubmitting(false);
      rethrow;
    }
  }

  Future<void> _withLoading(Future<void> Function() action) async {
    _isLoading = true;
    notifyListeners();
    try {
      await action();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void _setSubmitting(bool value) {
    _isSubmitting = value;
    notifyListeners();
  }
}
