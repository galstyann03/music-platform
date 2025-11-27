import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Advertisement } from './Advertisement';
import { User } from './User';

@Entity('ad_shown_to_users')
export class AdShownToUser {
    @PrimaryColumn({ type: 'int', name: 'ad_id' })
        adId!: number;

    @PrimaryColumn({ type: 'int', name: 'user_id' })
        userId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Advertisement, advertisement => advertisement.adsShownToUsers)
    @JoinColumn({ name: 'ad_id' })
        advertisement!: Advertisement;

    @ManyToOne(() => User, user => user.adsShownToUser)
    @JoinColumn({ name: 'user_id' })
        user!: User;
}

