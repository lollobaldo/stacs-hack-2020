import 'package:flutter/material.dart';

var profiles = [
  {
    'username': 'ChefYeum',
    'paperUsage': 40,
    'plasticUsage': 40,
    'canUsage': 40,
    'foodUsage': 40,
    'points': 5912,
    'picURL': 'https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/12243588_420216338189511_2130775979080153088_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_oc=AQmL9VzAarJGH_0Rxguo441c1o0ApfnJRLIeJIMr9sz5b_QdI0SzVMq4r0YvkcPOyKA&_nc_ht=scontent-lhr8-1.xx&oh=10df0691ab8d76bc097092500147402c&oe=5E98A5C3',
    'self': true
  }, 
  {
    'username': 'vitto136',
    'paperUsage': 40,
    'plasticUsage': 40,
    'canUsage': 40,
    'foodUsage': 40,
    'points': 4882,
    'picURL': 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/82381989_2559313790846323_8703151948557189120_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_oc=AQnEdl2k2sQTn_N4fMBBmqJ_cQHtTGHPDnqizVdPG0jupy3XXNGPLF0YkiaeYvsju34&_nc_ht=scontent-lht6-1.xx&oh=a1303d74f2ef11756770d0f529484575&oe=5E8E5868',
    'self': false,
  },
  {
    'username': 'Lollobaldo',
    'paperUsage': 40,
    'plasticUsage': 40,
    'canUsage': 40,
    'foodUsage': 40,
    'points': 2883,
    'picURL': 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/s960x960/59490021_1295764303911216_1540957149667000320_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_oc=AQlieAdM4QeaaNnA3EbQopTvIpb1N4Hf3t5DCKOOpDervE0T0AsomMG1kL3fzYP-fMY&_nc_ht=scontent-lht6-1.xx&_nc_tp=7&oh=3ccc8388925b0fc37b4c7f328bb15def&oe=5E921FCA',
    'self': false
  },
  {
    'username': 'marCo',
    'paperUsage': 40,
    'plasticUsage': 40,
    'canUsage': 40,
    'foodUsage': 40,
    'points': 2771,
    'picURL': 'https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/15002264_1352199314798897_6544756531818046447_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQl_FwtkqepHf8HQEAkd2gJrZtryoXNwl-G5MJDmZTK7k7rb0ATKwr_xCF2GdZ_3urk&_nc_ht=scontent-lht6-1.xx&oh=abfb432d2efa63b286aea047c645208f&oe=5E9537C5',
    'self': false
  },

];

final makeCard = (profile) => Card(
  elevation: 8.0,
  margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
  child: Container(
    decoration: BoxDecoration(color: profile['self'] ? Color.fromRGBO(32, 44, 87, .9) : Color.fromRGBO(64, 75, 96, .9)),
    child: ListTile(
        contentPadding: EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
        leading: Container(
          padding: EdgeInsets.only(right: 12.0),
          decoration: new BoxDecoration(
              border: new Border(
                  right: new BorderSide(width: 1.0, color: Colors.white24))),
          // child: Icon(Icons.autorenew, color: Colors.white),
          child: CircleAvatar(backgroundImage: NetworkImage(profile['picURL'])),
        ),
        title: Text(
          profile['username'],
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        // subtitle: Text("Intermediate", style: TextStyle(color: Colors.white)),

        subtitle: Row(
          children: <Widget>[
            Icon(Icons.linear_scale, color: Colors.yellowAccent),
            Text(" ${profile['points']} Points", style: TextStyle(color: Colors.white))
          ],
        ),
        trailing:
            Icon(Icons.score,
            color: Colors.white, size: 30.0)
      )
  ),
);

final makeBody = Container(
  child: ListView.builder(
    scrollDirection: Axis.vertical,
    shrinkWrap: true,
    itemCount: profiles.length,
    itemBuilder: (BuildContext context, int index) {
      return makeCard(profiles[index]);
    },
  ),
);

class Third extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      // appBar: topAppBar,
      body: makeBody,
      // bottomNavigationBar: makeBottom,
    );
  }
}
