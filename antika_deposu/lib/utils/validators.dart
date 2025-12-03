class Validators {
  static String? required(String? value, {String fieldName = 'Bu alan'}) {
    if (value == null || value.trim().isEmpty) {
      return '$fieldName gerekli';
    }
    return null;
  }

  static String? email(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email gerekli';
    }
    final emailRegex = RegExp(r'^\S+@\S+\.\S+$');
    if (!emailRegex.hasMatch(value.trim())) {
      return 'Gecerli bir email giriniz';
    }
    return null;
  }

  static String? minLength(String? value, {int min = 6, String fieldName = 'Bu alan'}) {
    if (value == null || value.trim().length < min) {
      return '$fieldName en az $min karakter olmali';
    }
    return null;
  }
}
