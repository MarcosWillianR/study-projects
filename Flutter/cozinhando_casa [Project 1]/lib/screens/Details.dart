import 'package:flutter/material.dart';
import '../models/receipt.dart';

class Details extends StatelessWidget {

  final Receipt receipt;

  Details({ Key? key, required this.receipt }): super(key: key);

  @override
  Widget build(BuildContext context) {
    return _buildDetail();
  }

  Widget  _buildDetail() {
    return Scaffold(
      body: ListView(
        children: [
          Column(
            children: [
              _buildDetailImage(receipt.foto),
              _buildDetailTitle(receipt.titulo),
              _buildDetailsLineIcon('${receipt.porcoes} porções', receipt.tempoPreparo),
              _buildDetailSubtitle('Ingredientes'),
              _buildDetailText(receipt.ingredientes),
              _buildDetailSubtitle('Modo de Preparo'),
              _buildDetailText(receipt.modoPreparo),
            ],
          )
        ],
      ),
      appBar: _buildAppBar(),
    );
  }

  Widget _buildDetailsLineIcon(rendimento, tempoPreparo) {
    return Row(
      children: [
        _buildDetailLineColumnIcon(Icons.restaurant, rendimento),
        _buildDetailLineColumnIcon(Icons.timer, tempoPreparo),
      ],
    );
  }

  Widget _buildDetailLineColumnIcon(icon, text) {
    return Expanded(
      child: Column(
        children: [
          Icon(icon, color: Colors.deepOrange),
          Text(text, style: TextStyle(
            color: Colors.deepOrange, 
            fontWeight: FontWeight.bold
          ))
        ],
      )
    );
  }

  Widget _buildDetailSubtitle(subTitle) {
    return Center(
      child: Text(
        subTitle,
        style: TextStyle(fontSize: 20),
      ) 
    );
  }

  Widget _buildDetailText(text) {
      return Container(
        padding: EdgeInsets.all(16),
        child: Text(text),
      );
    }

  Widget _buildDetailImage(image) {
    return Image.asset(image);
  }

  Widget _buildDetailTitle(title) {
  return Center(
    child: Text(
      title,
      style: TextStyle(
        color: Colors.deepOrange,
        fontSize: 30
      ),
    ),
  );
}

  PreferredSizeWidget _buildAppBar() {
    return AppBar(title: Text('Cozinhando em Casa'));
  }
}