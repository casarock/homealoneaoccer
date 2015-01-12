game.module(
	'game.wallground'
).require(
	'engine.renderer'
).body(function() {

	game.createClass('Wall', {
		init: function(x, y) {
			this.wallSprite = new game.Sprite('wall.png', x, y);

			this.wallBody = new game.Body({
				position: {
					x: x + (this.wallSprite.width/2),
					y: y + (this.wallSprite.height/2)
				},
				collisionGroup: 0,
				mass: 0
			});

			this.wallBody.addShape(new game.Rectangle(this.wallSprite.width, this.wallSprite.height));

			game.scene.world.addBody(this.wallBody);
			game.scene.stage.addChild(this.wallSprite);
			game.scene.addObject(this.wallSprite);
		}

	});

	game.createClass('Ground', {
		init: function(x, y) {
			this.groundSprite = new game.Sprite('ground.png', x, y);
			game.scene.stage.addChild(this.groundSprite);
			game.scene.addObject(this.groundSprite);
		}

	});

});
