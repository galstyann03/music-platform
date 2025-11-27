import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Playlist } from './Playlist';
import { Song } from './Song';

@Entity('playlist_songs')
export class PlaylistSong {
    @PrimaryColumn({ type: 'int', name: 'playlist_id' })
        playlistId!: number;

    @PrimaryColumn({ type: 'int', name: 'song_id' })
        songId!: number;

    @Column({ type: 'int', nullable: true })
        position?: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Playlist, playlist => playlist.playlistSongs)
    @JoinColumn({ name: 'playlist_id' })
        playlist!: Playlist;

    @ManyToOne(() => Song, song => song.playlistSongs)
    @JoinColumn({ name: 'song_id' })
        song!: Song;
}

