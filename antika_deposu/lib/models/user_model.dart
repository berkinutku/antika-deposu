class UserModel {
  final String id;
  final String email;
  final String? name;
  final String role;

  const UserModel({
    required this.id,
    required this.email,
    required this.role,
    this.name,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'] as String,
      email: json['email'] as String,
      name: json['name'] as String?,
      role: json['role'] as String? ?? 'user',
    );
  }

  Map<String, dynamic> toJson() => {
        '_id': id,
        'email': email,
        'name': name,
        'role': role,
      };

  bool get isAdmin => role == 'admin';
}
