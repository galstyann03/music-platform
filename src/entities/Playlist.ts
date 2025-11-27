import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';

import { User } from './User';
import { PlaylistSong } from './PlaylistSong';

@Entity('playlists')
@Index(['userId'])
export class Playlist {
    @PrimaryGeneratedColumn({ name: 'playlist_id' })
        playlistId!: number;

    @Column({ type: 'int', name: 'user_id' })
        userId!: number;

    @Column({ type: 'varchar', length: 100 })
        title!: string;

    @Column({ type: 'text', nullable: true })
        description?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    @Column({ type: 'boolean', name: 'is_public', default: false })
        isPublic!: boolean;

    // Relationships
    @ManyToOne(() => User, user => user.playlists)
    @JoinColumn({ name: 'user_id' })
        user!: User;

    @OneToMany(() => PlaylistSong, playlistSong => playlistSong.playlist)
        playlistSongs!: PlaylistSong[];
}

