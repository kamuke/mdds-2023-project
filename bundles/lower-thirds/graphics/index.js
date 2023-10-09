// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");

nodecg.Replicant("speakerReplicant", { defaultValue: "Speaker's name" });
nodecg.Replicant("titleReplicant", { defaultValue: "Speaker's title" });
nodecg.Replicant("animateInReplicant", { defaultValue: false });
nodecg.Replicant("animateOutReplicant", { defaultValue: false });
