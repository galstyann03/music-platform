import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';
import { Artist } from './Artist';

@Entity('followers')
export class Follower {
    @PrimaryColumn({ type: 'int', name: 'user_id' })
        userId!: number;

    @PrimaryColumn({ type: 'int', name: 'artist_id' })
        artistId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'followed_at', default: () => 'CURRENT_TIMESTAMP' })
        followedAt!: Date;

    // Relationships
    @ManyToOne(() => User, user => user.followers)
    @JoinColumn({ name: 'user_id' })
        user!: User;

    @ManyToOne(() => Artist, artist => artist.followers)
    @JoinColumn({ name: 'artist_id' })
        artist!: Artist;
}

