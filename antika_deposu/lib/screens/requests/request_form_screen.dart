import 'dart:io';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

import '../../providers/request_provider.dart';
import '../../utils/snackbar_utils.dart';
import '../../utils/validators.dart';

class RequestFormScreen extends StatefulWidget {
  const RequestFormScreen({super.key});

  @override
  State<RequestFormScreen> createState() => _RequestFormScreenState();
}

class _RequestFormScreenState extends State<RequestFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _markaController = TextEditingController();
  final _modelController = TextEditingController();
  final _parcaAdiController = TextEditingController();
  final _aciklamaController = TextEditingController();
  File? _selectedImage;

  @override
  void dispose() {
    _markaController.dispose();
    _modelController.dispose();
    _parcaAdiController.dispose();
    _aciklamaController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    
    // Kullanıcıya kamera veya galeri seçeneği sun
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Kamera'),
              onTap: () => Navigator.of(context).pop(ImageSource.camera),
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Galeri'),
              onTap: () => Navigator.of(context).pop(ImageSource.gallery),
            ),
            ListTile(
              leading: const Icon(Icons.cancel),
              title: const Text('İptal'),
              onTap: () => Navigator.of(context).pop(),
            ),
          ],
        ),
      ),
    );

    if (source == null) return;

    final image = await picker.pickImage(source: source);
    if (image != null) {
      setState(() {
        _selectedImage = File(image.path);
      });
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    final provider = context.read<RequestProvider>();

    try {
      await provider.createRequest(
        marka: _markaController.text.trim(),
        model: _modelController.text.trim(),
        parcaAdi: _parcaAdiController.text.trim(),
        aciklama: _aciklamaController.text.trim().isEmpty
            ? null
            : _aciklamaController.text.trim(),
        image: _selectedImage,
      );
      if (!mounted) return;
      SnackbarUtils.showSuccess(context, 'Talebiniz kaydedildi');
      context.go('/home');
    } catch (error) {
      SnackbarUtils.showError(context, error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    final requestProvider = context.watch<RequestProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Parca Talep Et')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _markaController,
                decoration: const InputDecoration(labelText: 'Marka'),
                validator: (value) => Validators.required(value, fieldName: 'Marka'),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _modelController,
                decoration: const InputDecoration(labelText: 'Model'),
                validator: (value) => Validators.required(value, fieldName: 'Model'),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _parcaAdiController,
                decoration: const InputDecoration(labelText: 'Parca Adi'),
                validator: (value) => Validators.required(value, fieldName: 'Parca adi'),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _aciklamaController,
                decoration: const InputDecoration(labelText: 'Aciklama'),
                maxLines: 4,
              ),
              const SizedBox(height: 16),
              OutlinedButton.icon(
                onPressed: _pickImage,
                icon: const Icon(Icons.add_photo_alternate),
                label: const Text('Fotoğraf Ekle (Kamera/Galeri)'),
              ),
              const SizedBox(height: 12),
              if (_selectedImage != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.file(
                    _selectedImage!,
                    height: 200,
                    fit: BoxFit.cover,
                  ),
                ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: requestProvider.isSubmitting ? null : _submit,
                child: const Text('Kaydet'),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: () => context.go('/home'),
                child: const Text('Iptal'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
