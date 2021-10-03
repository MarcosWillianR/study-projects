class Receipt {
  String? titulo;
  String? foto;
  String? porcoes;
  String? tempoPreparo;
  String? ingredientes;
  String? modoPreparo;

  Receipt(
      {this.titulo,
        this.foto,
        this.porcoes,
        this.tempoPreparo,
        this.ingredientes,
        this.modoPreparo});

  Receipt.fromJson(Map<String, dynamic> json) {
    titulo = json['titulo'];
    foto = json['foto'];
    porcoes = json['porcoes'];
    tempoPreparo = json['tempo_preparo'];
    ingredientes = json['ingredientes'];
    modoPreparo = json['modo_preparo'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['titulo'] = this.titulo;
    data['foto'] = this.foto;
    data['porcoes'] = this.porcoes;
    data['tempo_preparo'] = this.tempoPreparo;
    data['ingredientes'] = this.ingredientes;
    data['modo_preparo'] = this.modoPreparo;
    return data;
  }
}

