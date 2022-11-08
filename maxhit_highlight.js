// Made for version 1.1 (rev 4526)

(function() {
	function get_enemy_max_hit() {
		let base_max = game.combat.enemy.stats.maxHit;
		let max_normal_dmg = game.combat.player.applyTriangleToDamage(game.combat.player, base_max);
		let dr = (100-game.combat.player.stats.damageReduction)/100;

		if (!(game.combat.isActive)) return Math.floor(max_normal_dmg * dr);

		let atks = game.combat.enemy.availableAttacks;
		let max_dmgs = atks.map(atk=>game.combat.enemy.getAttackMaxDamage(atk.attack));
		let max_dmg = Math.max(...max_dmgs);
		
		let enemy_dmg = Math.floor(max_dmg);

		return enemy_dmg;
	}

	var enemy_maxHitUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-enemy-strength-bonus") && !(game.isPaused)) {
			let enemy_max_hit = get_enemy_max_hit();
			let ae_threshold = game.combat.player.autoEatThreshold;

			if ($("#combat-enemy-strength-bonus-better")[0] === undefined) {
				if ($("#combat-enemy-strength-bonus").parent()[0] === undefined) return;
				if ($("#combat-enemy-strength-bonus").parent().parent() === undefined) return;
				if ($("#combat-enemy-strength-bonus").parent().parent()[0] === undefined) return;

				let combatEnemyMaxHitLabel = $("<h5>", {
					class: "font-w400 font-size-sm text-combat-smoke m-1"
				});
				combatEnemyMaxHitLabel.html("Actual max hit");

				let combatEnemyMaxHitValue = $("<h5>", {
					class: "font-w600 font-size-sm text-combat-smoke text-right m-1"
				});
				let maxHitField = $("<span>", { id: "combat-enemy-strength-bonus-better" });
				maxHitField.appendTo(combatEnemyMaxHitValue);

				let leftbox = $("#combat-enemy-strength-bonus").parent().parent()[0].previousElementSibling;
				let rightbox = $("#combat-enemy-strength-bonus").parent().parent()[0];

				combatEnemyMaxHitLabel.appendTo(leftbox);
				combatEnemyMaxHitValue.appendTo(rightbox);

				leftbox.children[0].style.display = "none";
			}
			
			$("#combat-enemy-strength-bonus").css("display", "none");
			$("#combat-enemy-strength-bonus-better").html(enemy_max_hit);
			
			if (enemy_max_hit >= ae_threshold) {
				$("#combat-enemy-strength-bonus-better").css("color", "#FF0000");
			} else {
				$("#combat-enemy-strength-bonus-better").css("color", "#FFFFFF");
			}
		}
	};

	console.log("[melvor_hcco/maxhit_highlight] Loading...");
	setTimeout( () => setInterval(enemy_maxHitUpdater, 50), 5000 );
	console.log("[melvor_hcco/maxhit_highlight] Done!");
})();
