game.module(
	'game.game'
).require(
	'game.assets',
	'game.player',
	'game.ball',
	'game.wallground'
).body(function() {

	game.createScene('Game', {
		gravity: 1200,
		backgroundColor: 0x47c7ea,
		score: 0,
		scoreText: null,
		bulletTimeActive: 0,
		highscore: 0,
		states: {
			gameRuns: false,
			gameOver: false
		},
		resultTexts: {
			fail: "Try harder!",
			n00b: "ROFL!",
			highscore: "New Highscore!"
		},

		init: function() {
			this.world = new game.World(0, this.gravity);
			this.highscore = game.storage.get('highscore', 0);

			this.setBackground();

			this.wall = new game.Wall(game.system.width - 17, game.system.height - 256 - 64);
			this.ground = new game.Ground(0, game.system.height - 64);
			this.player = new game.Player(50, game.system.height - 36);

			this.highscoreText = new game.BitmapText("Best:" + this.pad(this.highscore, 3, 0), { font: 'font', align: 'left' });
			this.highscoreText.position.x = 10;
			this.highscoreText.position.y = game.system.height - 26;
			this.highscoreText.addTo(this.stage);

			this.scoreText = new game.BitmapText("" + this.pad(this.score, 3, 0), { font: 'font', align: 'left' });
			this.scoreText.position.x = game.system.width / 2 - this.scoreText.width / 2
			this.scoreText.position.y = 10;
			this.scoreText.addTo(this.stage);

			this.getReady();
		},

		mousedown: function() {
			if (this.states.gameRuns) {
				this.player.jump();
			} else if(this.states.gameOver) {
				// click leads to intro scene!
				game.system.setScene('Main');
			} else {
				game.scene.removeObject(this.getReadyText);
				game.scene.stage.removeChild(this.getReadyText);

				this.ball = new game.Ball(20, 200);
				this.score = -1;
				this.addScore();
				this.states.gameRuns = true;
				this.states.gameOver = false;
			}
		},

		addScore: function() {
			this.score++;
			this.scoreText.setText(""+ this.pad(this.score, 3, 0));
			this.scoreText.updateTransform();
			this.scoreText.position.x = game.system.width / 2 - this.scoreText.width / 2
			this.scoreText.position.y = 10;
		},

		gameOver: function() {
			// save highscore.
			this.states.gameOver = true;
			var newHigh = false;
			if (this.score > this.highscore) {
				game.storage.set('highscore', this.score);
				this.highscore = this.score;
				this.highscoreText.setText("Best:"+ this.pad(this.highscore, 3, 0));
				this.highscoreText.updateTransform();
				newHigh = true;
			}

			// show results..
			this.showResultsBox(newHigh);
		},

		getReady: function() {
			this.getReadyText = new game.BitmapText("Get Ready...", {font: 'font', align: 'left'});
			this.getReadyText.position.x = -(game.system.width + 10);
			this.getReadyText.position.y = game.system.height / 2 - this.getReadyText.height / 2;
			this.getReadyText.addTo(this.stage);

			var tween = new game.Tween(this.getReadyText.position);
			tween.to({x:(game.system.width / 2 - this.getReadyText.width / 2)}, 1500);
			tween.easing(game.Tween.Easing.Elastic.Out);
			tween.start();
		},

		showResultsBox: function(high) {
			var gameOverBox = new game.Sprite('gameover.png');
			var text = "";

			if (this.score === 0) {
				text = this.resultTexts.n00b;
			} else if (high) {
				text = this.resultTexts.highscore;
			} else {
				text = this.resultTexts.fail;
			}

			gameOverBox.addTo(this.stage);
			gameOverBox.anchor = {
				x: 0.5,
				y: 0.5
			};

			gameOverBox.position = {
				x: game.system.width / 2,
				y: game.system.height / 2
			};

			var resultText = new game.BitmapText(text, {font: 'font', align: 'left'});
			resultText.position.x = game.system.width / 2 - resultText.width / 2;
			resultText.position.y = game.system.height / 2 - resultText.height / 2;
			resultText.addTo(this.stage);

			var tween = new game.Tween(resultText);
			tween.to({rotation:2*Math.PI}, 1500);
			tween.easing(game.Tween.Easing.Elastic.Out);
			tween.start();

			if (high) {
				var smokeEmitter = new game.Emitter({
					rotate: 0,
					endAlpha: 0,
					count: 64,
					rate: 0.5,
					duration: 500,
					life: 1000,
					textures: ['particle.png']
				});
				smokeEmitter.position = {
					x: game.system.width/2,
					y: game.system.height/2
				};
				smokeEmitter.positionVar.set(100, 100);
				smokeEmitter.addTo(game.scene.stage);
				game.scene.addEmitter(smokeEmitter);
			}
		},

		setBackground: function() {
			var background = new game.Sprite('city_bg.png').addTo(this.stage);
			background.position = {
				x: 0,
				y: 220
			};
			background.alpha = 0.5
		},

		pad: function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

	});

});
