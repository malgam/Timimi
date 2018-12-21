/*\
title: $:/plugins/tesseract/action-launchscript/stdout-listener.js
type: application/javascript
module-type: startup

Listen to stdout from scripts

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  // Export name and synchronous status
  exports.name = "stdout-listener";
  exports.after = ["startup"];
  exports.synchronous = true;

  exports.startup = function() {
    document.addEventListener("timimi-launch-script-stdout", function(event) {
      console.log("Timimi: Listening to event :" + event.type);
      if (typeof event.detail.title != "undefined") {
        $tw.wiki.addTiddler(
          new $tw.Tiddler(
            event.detail.creationFields,
            event.detail.fields,
            event.detail.modificationFields,
            {
              title: event.detail.title,
              text: event.detail.message
            }
          )
        );
      } else if (typeof event.detail.sep != "undefined") {
        var spl = event.detail.message.split(event.detail.sep);
        $tw.wiki.addTiddler(
          new $tw.Tiddler(
            event.detail.creationFields,
            event.detail.fields,
            event.detail.modificationFields,
            {
              title: spl[0],
              text: spl[1]
            }
          )
        );
      }
      $tw.notifier.display(
        "$:/plugins/tesseract/action-launchscript/notification"
      );
    });
  };
})();
