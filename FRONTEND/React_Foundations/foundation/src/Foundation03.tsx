import React, { type ReactNode } from 'react'

const avatars = [
  {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV",
  },
  {
    id: 2,
    name: "Flux",
    role: "State Keeper",
    power: "useState",
    initials: "FX",
  },
  {
    id: 3,
    name: "Memo",
    role: "Optimizer",
    power: "Memoization",
    initials: "MM",
  },
];

type shellData = {
    title : string,
    children : ReactNode
}


const Shell = (props:shellData) => {
    return (
        <div>
            <h1>Shelling...</h1>
            <p>Titile : {props.title}</p>
            {props.children}
        </div>
    )
}

type Avatar = {
    name : string,
    role : string,
    initials : string,
}

type  AvatarCardProps = {
    avatar :Avatar,
    level? : string
}

function AvatarCard({avatar , level = 'Rookie'}:AvatarCardProps) {
    return (
        <article>
            <div>{avatar.initials}</div>
            <div>{avatar.name}</div>
            <div>{avatar.role}</div>
            <div>Level {level}</div>
        </article>
    )
}

function Foundation03() {
  return (
    <div>
        <h1>Children in reacting...</h1>
        <Shell title="Mehtab">
            <h1>I'm here</h1>
            <h1>Invading ...</h1>
        </Shell>
        <h1>Mehtab is saying hello</h1>
        <section>
            {avatars.map((avt,idx) => (
                <AvatarCard key={idx} level='Batman' avatar={avt} />
            ))}
        </section>
    </div>
  )
}

export default Foundation03