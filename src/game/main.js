game.module(
	'game.main'
).require(
	'game.assets',
	'game.objects'
).body(function() {

	game.createScene('Main', {
		gravity: 1000,
		backgroundColor: 0x005500,

		init: function() {
			this.world = new game.World(0, this.gravity);
			this.player = new game.Player(100, game.system.height - 36);
			this.ball = new game.Ball(232, 200);
		},

		mousedown: function() {
			this.player.jump();
		}
	});

});
