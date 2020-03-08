import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

class MapSample extends StatefulWidget {
  @override
  State<MapSample> createState() => MapSampleState();
}

class MapSampleState extends State<MapSample> {
  Completer<GoogleMapController> _controller = Completer();
  Location location = Location();

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: GoogleMap(
        mapType: MapType.hybrid,
        initialCameraPosition: _stAndysPos,
        onMapCreated: (GoogleMapController controller) {
          _controller.complete(controller);
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _goToUser,
        label: Text('Find Nearby Bins'),
        icon: Icon(Icons.restore_from_trash),
      ),
    );
  }

  final _getPos = (lat, long) =>  CameraPosition( zoom: 14,
                                                  tilt: 0, // i.e. camera directly facing the earth
                                                  bearing: 0, // i.e. camera points the north 
                                                  target: LatLng(lat, long));

  final _stAndysPos = CameraPosition(zoom: 14,
                                    tilt: 0, // i.e. camera directly facing the earth
                                    bearing: 0, // i.e. camera points the north 
                                    target: LatLng(56.3399085,-2.8096820));

  Future<CameraPosition> _getUserPos() async {
    final currentLocation = await location.getLocation();
    return _getPos(currentLocation.latitude, currentLocation.longitude);
  }

  Future<void> _goToUser() async {
    final GoogleMapController controller = await _controller.future;
    _getUserPos().then((pos) => controller.animateCamera(CameraUpdate.newCameraPosition(pos)));
  }
}