game.module(
	'game.main'
).require(
	'game.assets',
	'game.player',
	'game.ball',
	'game.wallground'
).body(function() {

	game.createScene('Main', {
		gravity: 1200,
		backgroundColor: 0x47c7ea,

		init: function() {
			this.world = new game.World(0, this.gravity);

			this.wall = new game.Wall(game.system.width - 17, game.system.height - 256 - 64);
			this.ground = new game.Ground(0, game.system.height - 64);

			this.player = new game.Player(50, game.system.height - 36);
			this.ball = new game.Ball(232, 200);
		},

		mousedown: function() {
			this.player.jump();
		}
	});

});
