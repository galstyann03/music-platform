import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

import { User } from './User';
import { Song } from './Song';

@Entity('listening_histories')
@Index(['userId'])
@Index(['songId'])
export class ListeningHistory {
    @PrimaryGeneratedColumn({ name: 'history_id' })
        historyId!: number;

    @Column({ type: 'int', name: 'user_id' })
        userId!: number;

    @Column({ type: 'int', name: 'song_id' })
        songId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'streamed_at', default: () => 'CURRENT_TIMESTAMP' })
        streamedAt!: Date;

    @Column({ type: 'int', name: 'duration_played', nullable: true })
        durationPlayed?: number;

    // Relationships
    @ManyToOne(() => User, user => user.listeningHistories)
    @JoinColumn({ name: 'user_id' })
        user!: User;

    @ManyToOne(() => Song, song => song.listeningHistories)
    @JoinColumn({ name: 'song_id' })
        song!: Song;
}

