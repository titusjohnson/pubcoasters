define(['app', 'ember', 'filepicker', 'jquery'], function(App, Ember, filepicker, $) {

    App.CoastersNewController = Ember.Controller.extend({

      resetForm: function() {
        this.set('newName', '');
        this.set('newDesc', '');
      },

      cancel: function() {
        this.resetForm();
        this.transitionToRoute('coasters');
      },

      pickerSuccess: function() {
        var self = this;
        return function(result) {
          var urls = [];
          if (!result instanceof Array) {
            result = [result];
          }
          $.each(result, function(i, r) {
            urls.push(r.url);
          });
          self.set('newImages', urls);
        }
      },

      pickerFail: function() {
        return function(code) {
          console.log("Filepicker Error: ", code);
        }
      },

      openPicker: function() {
        var options = {
          extensions: ['.jpg', '.jpeg', '.gif', '.png'],
          openTo: 'COMPUTER',
          debug: false,
          services: [
            'COMPUTER',
            'DROPBOX',
            'FACEBOOK',
            'GOOGLE_DRIVE',
            'INSTAGRAM',
            'URL',
            'IMAGE_SEARCH'
          ]
        };
        filepicker.pickMultiple(options, this.pickerSuccess(), this.pickerFail());
      },

      createCoaster: function() {
        var self = this;

        var name = this.get('newName');
        var desc = this.get('newDesc');
        var images = this.get('newImages');
        var tags = this.get('newTags');

        var coaster = App.Coaster.createRecord({
          name: name,
          desc: desc,
          images: images,
          tags: tags
        });

        this.resetForm();

        coaster.save().then(function(c) {
          self.transitionToRoute('coasters.show', c);
        });

      }

    });

    return App.CoastersNewController;

});