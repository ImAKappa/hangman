// Based on Matter.js ragdoll example (https://github.com/liabru/matter-js/blob/master/examples/ragdoll.js)
import Matter from 'matter-js';

const ragdollHead = (x: number, y: number, radius: number, scale: number) => {
    let headOptions = Matter.Common.extend({
        label: 'head',
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            // radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale]
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.circle(x, y, radius, headOptions);
}

const ragdollTorso = (x: number, y: number, width: number, height: number, scale: number) => {
    var torsoOptions = Matter.Common.extend({
        label: 'torso',
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            // radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale]
        },
        render: {
            fillStyle: '#E0A423'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, torsoOptions);
}

const ragdollArm = (x: number, y: number, width: number, height: number, scale: number, armLabel: string) => {
    let armOptions = Matter.Common.extend({
        label: armLabel,
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            // radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, armOptions);
}

const ragdollLeg = (x: number, y: number, width: number, height: number, scale: number, legLabel: string) => {
    var legOptions = Matter.Common.extend({
        label: legLabel,
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            // radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, legOptions);
}

const constrainBodyParts = (head: Matter.Body,
    torso: Matter.Body,
    leftArm: Matter.Body,
    rightArm: Matter.Body,
    leftLeg: Matter.Body,
    rightLeg: Matter.Body,
    scale: number) => {

    const STIFFNESS = 0.6;

    // Constrain head
    let headConstraint = Matter.Constraint.create({
        bodyA: head,
        pointA: {
            x: 0,
            y: 25 * scale
        },
        pointB: {
            x: 0,
            y: -35 * scale
        },
        bodyB: torso,
        stiffness: STIFFNESS,
        render: {
            visible: false
        }
    });
    // Define left and right sides
    let sideEnum = {left: -1, right: 1};
    let arms = {left: leftArm, right: rightArm};
    let legs = {left: leftLeg, right: rightLeg};

    // Arm & Leg constraints
    let torsoJoinArm: {left?, right?} = {};
    let torsoJoinLeg: {left?, right?} = {};
    for (let side of ['left', 'right']) {
        torsoJoinArm[side] = Matter.Constraint.create({
            bodyA: torso,
            pointA: {
                x: sideEnum[side] * 24 * scale,
                y: -23 * scale
            },
            pointB: {
                x: 0,
                y: -8 * scale
            },
            bodyB: arms[side],
            stiffness: STIFFNESS,
            render: {
                visible: false
            }
        });

        torsoJoinLeg[side] = Matter.Constraint.create({
            bodyA: torso,
            pointA: {
                x: sideEnum[side] * 10 * scale,
                y: 30 * scale
            },
            pointB: {
                x: 0,
                y: -10 * scale
            },
            bodyB: legs[side],
            stiffness: STIFFNESS,
            render: {
                visible: false
            }
        });

    }
    return {headConstraint, torsoJoinArm, torsoJoinLeg};
}

interface Params {
    width: number,
    height: number,
    radius?: number,
    xshift?: number,
    yshift?: number,
}

const scaled = (obj: Params, scale: number): Params => {
    let scaledObj: Params = {width: 0, height: 0}
    for (let [key, value] of Object.entries(obj)) {
        scaledObj[key] = scale * value;
    }
    return scaledObj;
}

/**
 * Based on Matter.js ragdoll example (https://github.com/liabru/matter-js/blob/master/examples/ragdoll.js)
 * @param x
 * @param y
 * @param scale
 * @param options
 */
export const newRagdoll = (x: number, y: number, scale: number) => {
    scale = typeof scale === 'undefined' ? 1 : scale;

    // Module aliases
    let Body = Matter.Body,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Composite = Matter.Composite,
        Common = Matter.Common;

    // Create physics bodies for body parts
    // head
    const HEAD = scaled({width: 0, height: 0, radius: 20, yshift: 60}, scale);
    let head = ragdollHead(x, y - HEAD.yshift!, HEAD.radius!, scale);
    // // torso
    const TORSO = scaled({width: 20, height: 80}, scale);
    let torso = ragdollTorso(x, y, TORSO.width, TORSO.height, scale);
    // // arms
    const ARMS = scaled({xshift: 24, yshift: 20, width: 12, height: 60}, scale);
    let rightArm = ragdollArm(x + ARMS.xshift!, y - ARMS.yshift!, ARMS.width, ARMS.height, scale, 'right-arm');
    let leftArm = ragdollArm(x - ARMS.xshift!, y - ARMS.yshift!, ARMS.width, ARMS.height, scale, 'left-arm');
    // //legs
    const LEGS = scaled({xshift: 20, yshift: 65, width: 15, height: 70}, scale);
    let leftLeg = ragdollLeg(x - LEGS.xshift!, y + LEGS.yshift!, LEGS.width, LEGS.height, scale, 'left-leg');
    let rightLeg = ragdollLeg(x + LEGS.xshift!, y + LEGS.yshift!, LEGS.width, LEGS.height, scale, 'right-leg');

    // Join body parts
    let constraints = constrainBodyParts(head, torso, rightArm, leftArm, leftLeg, rightLeg, scale);

    // var legToLeg = Constraint.create({
    //     bodyA: leftLowerLeg,
    //     bodyB: rightLowerLeg,
    //     stiffness: 0.01,
    //     render: {
    //         visible: false
    //     }
    // });
    
    let person = Composite.create({
        bodies: [
            torso, head,
            leftArm, rightArm, 
            leftLeg, rightLeg
        ],
        constraints: [
            constraints.headConstraint,
            constraints.torsoJoinArm.right, constraints.torsoJoinArm.left,
            constraints.torsoJoinLeg.right, constraints.torsoJoinLeg.left,
        ]
    });

    return person;
}