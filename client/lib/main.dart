import 'package:flutter/material.dart';
import 'tabs/1_dashboard.dart';
import 'tabs/2_map.dart';
import 'tabs/3_userlist.dart';

void main() {
  runApp(MaterialApp(
    // Title
      title: "iCan",
      // Home
      home: MyHome(),
      theme: new ThemeData(primaryColor: Color.fromRGBO(58, 66, 86, 1.0)),
    ));
}

class MyHome extends StatefulWidget {
  @override
  MyHomeState createState() => MyHomeState();
}

// SingleTickerProviderStateMixin is used for animation
class MyHomeState extends State<MyHome> with SingleTickerProviderStateMixin {
  /*
   *-------------------- Setup Tabs ------------------*
   */
  // Create a tab controller
  TabController controller;

  @override
  void initState() {
    super.initState();

    // Initialize the Tab Controller
    controller = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    // Dispose of the Tab Controller
    controller.dispose();
    super.dispose();
  }

  TabBar getTabBar() {
    return TabBar(
      tabs: <Tab>[
        Tab(
          // set icon to the tab
          icon: Icon(Icons.dashboard),
        ),
        Tab(
          icon: Icon(Icons.map),
        ),
        Tab(
          icon: Icon(Icons.person),
        ),
      ],
      // setup the controller
      controller: controller,
    );
  }

  TabBarView getTabBarView(var tabs) {
    return TabBarView(
      // Add tabs as widgets
      children: tabs,
      // set the controller
      controller: controller,
    );
  }

  /*
   *-------------------- Setup the page by setting up tabs in the body ------------------*
   */
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Appbar
        appBar: AppBar(
          // Title
            title: Text("iCan"),
            // Set the background color of the App Bar
            // backgroundColor: Colors.blue,
            backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
            // Set the bottom property of the Appbar to include a Tab Bar
            bottom: getTabBar()),
        // Set the TabBar view as the body of the Scaffold
        body: getTabBarView(<Widget>[First(), HomePage(), Third()]));
  }
}
