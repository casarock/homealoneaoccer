game.module(
	'game.playbutton'
).require(
	'engine.renderer'
).body(function() {

	game.createClass('Playbutton', 'Sprite', {
		interactive: true,
		active: true,
		pressed: false,

		init: function(x, y) {
			this._super('play_button_inactive.png', x, y, {
				anchor: {
					x: 0.5,
					y: 0.5
				}
			});

			game.scene.stage.addChild(this);
			game.scene.addObject(this);
			this.pressed = false;
		},

		mousedown: function() {
			this.setTexture('play_button_active.png');
			this.pressed = true;
		},

		mouseup: function() {
			this.setTexture('play_button_inactive.png');
		},
		click: function() {
			game.system.setScene('Game');
		}

	});
});
