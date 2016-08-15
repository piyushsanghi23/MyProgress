'use strict';
(function () {
    var app = {
        data: {}
    };


    var bootstrap = function () {
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                skin: 'nova', //flat
                initial: 'components/homeView/view.html'
            });
        });
    };

    if (window.cordova) {

        document.addEventListener('deviceready', function () {

            document.addEventListener("offline", onOffline, false);

            function onOffline() {
                // Handle the offline event
                document.getElementById('note_wifi').style.display = 'block';
                setTimeout(function () {
                    document.getElementById('note_wifi').style.display = 'none';
                }, 3000);
                if (count == 1 && count_dis == 0) {
                    //alert("offline");
                    app.openDatabase();
                    app.readRecords('test');
                    app.readRecords('schedule');
                    app.readRecords('beacon');
                    app.startScanForBeacons();
                    //app.dropTable();
                    count++;
                }
            }
            app.openDatabase();
         //   app.dropTable('log');
            //app.dropTable('schedule');
            //app.dropTable('beacon');
            app.countRecords();
            
            if (navigator && navigator.splashscreen) {
                //alert("deviceReady");
                navigator.splashscreen.hide();
            }
            var element = document.getElementById('appDrawer');
            if (typeof (element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function (event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function (event) {
                        app.keepActiveState($(this).closest('li'));
                    });
                }
            }

            bootstrap();
            //app.readRecords('beacon');
            //startVuforia();
            //setTimeout(authenticate(),5000);

            //advertise();

        }, false);

    } else {
        bootstrap();
    }


    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };

    app.openLink = function (url) {
        if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
            url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
        }

        window.open(url, '_system');
        if (window.event) {
            window.event.preventDefault && window.event.preventDefault();
            window.event.returnValue = false;
        }

    };
    //deviceList.addEventListener('touchstart', this.connect, false); // assume not scrolling
    // document.addEventListener("backbutton", onBackKeyDown, false);

}());



/*
rest api to push the data*/
// END_CUSTOM_CODE_kendoUiMobileApp