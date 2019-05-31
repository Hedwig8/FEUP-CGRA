/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
    constructor(scene) {
        super(scene);

        this.initialAxiom = "X";
        this.ruleF = ["FF"];
        this.ruleX = [
            "F[-X][X]F[-X]+X",
            "F[-X][X]+X",
            "F[+X]-X",
            "F[/X][X]F[\\\\X]+X",
            "F[\\X][X]/X",
            "F[/X]\\X",
            "F[^X][X]F[&X]^X",
            "F[^X]&X",
            "F[&X]^X",
        ];
        this.angleDegrees = 30.0;
        this.iterationsNum = 4;
        this.scaleFactor = 0.5;

        this.doGenerate();
    }

    doGenerate() {
        this.generate(
            this.initialAxiom,
            {
                "F": this.ruleF,
                "X": this.ruleX
            },
            this.angleDegrees,
            this.iterationsNum,
            this.scaleFactor
        );
    }

    initGrammar() {
        this.grammar = {
            "F": new MyTreeBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }
}
