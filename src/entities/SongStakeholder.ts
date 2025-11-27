import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Song } from './Song';
import { Stakeholder } from './Stakeholder';

@Entity('song_stakeholders')
export class SongStakeholder {
    @PrimaryColumn({ type: 'int', name: 'song_id' })
        songId!: number;

    @PrimaryColumn({ type: 'int', name: 'stakeholder_id' })
        stakeholderId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Song, song => song.songStakeholders)
    @JoinColumn({ name: 'song_id' })
        song!: Song;

    @ManyToOne(() => Stakeholder, stakeholder => stakeholder.songStakeholders)
    @JoinColumn({ name: 'stakeholder_id' })
        stakeholder!: Stakeholder;
}

