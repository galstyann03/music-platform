import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';
import { Song } from './Song';

@Entity('likes')
export class Like {
    @PrimaryColumn({ type: 'int', name: 'user_id' })
        userId!: number;

    @PrimaryColumn({ type: 'int', name: 'song_id' })
        songId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'liked_at', default: () => 'CURRENT_TIMESTAMP' })
        likedAt!: Date;

    // Relationships
    @ManyToOne(() => User, user => user.likes)
    @JoinColumn({ name: 'user_id' })
        user!: User;

    @ManyToOne(() => Song, song => song.likes)
    @JoinColumn({ name: 'song_id' })
        song!: Song;
}

