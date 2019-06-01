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
            "F[-FX][FX]F[-FX]+FX",
            "F[-FX][FX]+FX",
            "F[+FX]-FX",
            "F[/FX][FX]F[\\\\FX]+FX",
            "F[\\XF][FX]/FX",
            "F[/FX]\\FX",
            "F[^FX][FX]F[F&X]^FX",
            "F[^FX]&FX",
            "F[&FX]^XF[X]F",
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
            "F": new MyTreeBranch(this.scene, 0.3),
            "X": new MyLeaf(this.scene)
        };
    }
}
