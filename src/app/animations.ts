import { trigger, state, style, transition, animate } from '@angular/animations';


export let fade = trigger('fade', [
    state('void', style({ transform: 'translateY(-150px)', opacity: 0 })),
    transition (':enter, :leave', [
        animate(400)
    ])
])