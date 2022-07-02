// Based on Matter.js ragdoll example (https://github.com/liabru/matter-js/blob/master/examples/ragdoll.js)
import Matter from 'matter-js';

const ragdollHead = (x, y, radius, scale) => {
    let headOptions = Matter.Common.extend({
        label: 'head',
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale]
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.circle(x, y, radius, headOptions);
}

const ragdollTorso = (x, y, width, height, scale) => {
    var torsoOptions = Matter.Common.extend({
        label: 'torso',
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale]
        },
        render: {
            fillStyle: '#E0A423'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, torsoOptions);
}

const ragdollArm = (x, y, width, height, scale, armLabel) => {
    let armOptions = Matter.Common.extend({
        label: armLabel,
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, armOptions);
}

const ragdollLeg = (x, y, width, height, scale, legLabel) => {
    var legOptions = Matter.Common.extend({
        label: legLabel,
        collisionFilter: {
            group: Matter.Body.nextGroup(true)
        },
        chamfer: {
            radius: 10 * scale
        },
        render: {
            fillStyle: '#FFBC42'
        }
    }, false);
    return Matter.Bodies.rectangle(x, y, width, height, legOptions);
}

const constrainBodyParts = (head, torso, leftArm, rightArm, leftLeg, rightLeg, scale) => {
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
        stiffness: 0.6,
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
            stiffness: 0.6,
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
            stiffness: 0.6,
            render: {
                visible: false
            }
        });

    }
    return {headConstraint, torsoJoinArm, torsoJoinLeg};
}

/**
 * Based on Matter.js ragdoll example (https://github.com/liabru/matter-js/blob/master/examples/ragdoll.js)
 * @param x
 * @param y
 * @param scale
 * @param options
 */
export const newRagdoll = (x: number, y: number, scale: number, options?) => {
    scale = typeof scale === 'undefined' ? 1 : scale;

    let Body = Matter.Body,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Composite = Matter.Composite,
        Common = Matter.Common;

    // Body parts
    var head = ragdollHead(x, y - 60 * scale, 34 * scale, scale);
    var torso = ragdollTorso(x, y, 55 * scale, 80 * scale, scale);
    var rightArm = ragdollArm(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, scale, 'right-arm');
    var leftArm = ragdollArm(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, scale, 'left-arm');
    var leftLeg = ragdollLeg(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, scale, 'left-leg');
    var rightLeg = ragdollLeg(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, scale, 'right-leg');

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