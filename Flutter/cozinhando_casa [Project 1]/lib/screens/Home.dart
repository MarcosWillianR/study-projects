import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return _buildHome();
  }

  Widget _buildHome() {
    return Scaffold(
      body: _buildCard(),
      appBar: _buildAppBar(),
    );
  }

  Widget _buildCard() {
    return SizedBox(
      height: 420,
      child: Card(
        margin: EdgeInsets.all(16),
        child: Column(
          children: [
            Stack(
              children: [
                _buildCardImage(),
                _buildCardText(),
              ],
            )
          ]
        )
      )
    );
  }

  Widget _buildCardText() {
    return Positioned(
      bottom: 10,
      left: 10,
      child: Text('Bolo de Nananja', style: TextStyle(fontSize: 20, color: Colors.blue))
    );
  }

  Widget _buildCardImage() {
    return Image.network('https://media-exp1.licdn.com/dms/image/C4D1BAQFuvjsyn1tCjw/company-background_10000/0/1547142468375?e=2159024400&v=beta&t=0SQ81q8sjjmrGydkunA6SUIUeaw6egEodbkVY0HrQcU', fit: BoxFit.fill, height: 388,);
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(title: Text('Cozinhando em Casa'));
  }
}