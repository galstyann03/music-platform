import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Artist } from './Artist';
import { Song } from './Song';

export enum ArtistRole {
    MAIN = 'main',
    FEATURED = 'featured',
}

@Entity('artist_songs')
export class ArtistSong {
    @PrimaryColumn({ type: 'int', name: 'song_id' })
        songId!: number;

    @PrimaryColumn({ type: 'int', name: 'artist_id' })
        artistId!: number;

    @Column({
        type: 'enum',
        enum: ArtistRole,
        default: ArtistRole.MAIN,
    })
        role!: ArtistRole;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Song, song => song.artistSongs)
    @JoinColumn({ name: 'song_id' })
        song!: Song;

    @ManyToOne(() => Artist, artist => artist.artistSongs)
    @JoinColumn({ name: 'artist_id' })
        artist!: Artist;
}

