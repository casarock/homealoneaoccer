game.module(
	'game.main'
).require(
	'game.assets',
	'game.objects'
).body(function() {

	game.createScene('Main', {
		init: function() {
			this.world = new game.World(0, 0);
			this.player = new game.Player(20, 20);
		},

		mousedown: function() {
			this.player.jump();
		}
	});

});
