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
		gameRuns: false,
		score: 0,
		scoreText: null,
		bulletTimeActive: 0,

		init: function() {
			this.world = new game.World(0, this.gravity);

			var background = new game.Sprite('city_bg.png').addTo(this.stage);
			background.position = {
				x: 0,
				y: 220
			};
			background.alpha = 0.75

			this.wall = new game.Wall(game.system.width - 17, game.system.height - 256 - 64);
			this.ground = new game.Ground(0, game.system.height - 64);
			this.player = new game.Player(50, game.system.height - 36);

			this.scoreText = new game.BitmapText("Score:" + this.pad(this.score, 3, 0), { font: 'font', align: 'left' });
			this.scoreText.position.x = 10;
			this.scoreText.position.y = game.system.height - 26;
			this.scoreText.addTo(this.stage);
		},

		mousedown: function() {
			if (this.gameRuns) {
				this.player.jump();
			} else {
				this.ball = new game.Ball(20, 200);
				this.score = -1;
				this.addScore();
				this.gameRuns = true;
			}
		},

		addScore: function() {
			this.score++;

			this.scoreText.setText("Score:" + this.pad(this.score, 3, 0));
			this.scoreText.updateTransform();
			this.scoreText.position.x = 10;
			this.scoreText.position.y = game.system.height - 26;
		},

		pad: function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

	});

});
