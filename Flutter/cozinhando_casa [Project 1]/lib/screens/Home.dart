import 'package:flutter/material.dart';
import '../models/receipt.dart';
import 'dart:convert';

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new HomeState();
}

class HomeState extends State<Home> {
@override
  Widget build(BuildContext context) {
    return _buildHome();
  }

  Widget _buildHome() {
    return Scaffold(
      body: _buildCardList(),
      appBar: _buildAppBar(),
    );
  }

  Widget _buildCardList() {
    return FutureBuilder(
      future: DefaultAssetBundle.of(context).loadString('assets/receitas.json'),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.data == null) {
            return Text('no data');
          } else {
            List<dynamic> receipts = json.decode(snapshot.data.toString());

            return ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                Receipt receipt = Receipt.fromJson(receipts[index]);
                return _buildCard(receipt.titulo, receipt.foto);
              },
              itemCount: receipts.length,
            );
          }
        } else {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [CircularProgressIndicator()],
              )
            ],
          );
        }
      },
    );
  }

  Widget _buildCard(titulo, foto) {
    return SizedBox(
      height: 300,
      child: Card(
        margin: EdgeInsets.all(16),
        child: Column(
          children: [
            Stack(
              children: [
                _buildCardImage(foto),
                _buildCardGradient(),
                _buildCardText(titulo),
              ],
            )
          ]
        )
      )
    );
  }

  Widget _buildCardGradient() {
    return Container(
      height: 268,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: FractionalOffset.topCenter,
          end: FractionalOffset.bottomCenter,
          colors: [Colors.transparent, Colors.deepOrange.withOpacity(0.7)]
        ) 
      ),
    );
  }

  Widget _buildCardText(titulo) {
    return Positioned(
      bottom: 10,
      left: 10,
      child: Text(
        titulo, 
        style: TextStyle(
          fontSize: 20, 
          color: Colors.white
        ))
    );
  }

  Widget _buildCardImage(String foto) {
    return Image.asset(foto, fit: BoxFit.fill, height: 268,);
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(title: Text('Cozinhando em Casa'));
  }
}