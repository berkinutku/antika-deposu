import 'package:intl/intl.dart';

class RequestModel {
  final String id;
  final String userId;
  final String marka;
  final String model;
  final String parcaAdi;
  final String? aciklama;
  final String? imageUrl;
  final DateTime createdAt;

  RequestModel({
    required this.id,
    required this.userId,
    required this.marka,
    required this.model,
    required this.parcaAdi,
    required this.createdAt,
    this.aciklama,
    this.imageUrl,
  });

  factory RequestModel.fromJson(Map<String, dynamic> json) {
    return RequestModel(
      id: json['_id'] as String,
      userId: json['userId'] as String,
      marka: json['marka'] as String,
      model: json['model'] as String,
      parcaAdi: json['parcaAdi'] as String,
      aciklama: json['aciklama'] as String?,
      imageUrl: json['imageUrl'] as String?,
      createdAt: DateTime.tryParse(json['createdAt']?.toString() ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() => {
        '_id': id,
        'userId': userId,
        'marka': marka,
        'model': model,
        'parcaAdi': parcaAdi,
        'aciklama': aciklama,
        'imageUrl': imageUrl,
        'createdAt': createdAt.toIso8601String(),
      };

  String get formattedDate => DateFormat('dd MMM yyyy HH:mm').format(createdAt);
}
