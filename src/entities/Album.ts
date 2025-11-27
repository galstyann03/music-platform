import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';

import { Artist } from './Artist';
import { Song } from './Song';
import { AlbumGenre } from './AlbumGenre';

@Entity('albums')
@Index(['artistId'])
export class Album {
    @PrimaryGeneratedColumn({ name: 'album_id' })
        albumId!: number;

    @Column({ type: 'varchar', length: 200 })
        title!: string;

    @Column({ type: 'int', name: 'artist_id' })
        artistId!: number;

    @Column({ type: 'date', name: 'release_date', nullable: true })
        releaseDate?: Date;

    @Column({ type: 'varchar', length: 500, name: 'cover_image_url', nullable: true })
        coverImageUrl?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @ManyToOne(() => Artist, artist => artist.albums)
    @JoinColumn({ name: 'artist_id' })
        artist!: Artist;

    @OneToMany(() => Song, song => song.album)
        songs!: Song[];

    @OneToMany(() => AlbumGenre, albumGenre => albumGenre.album)
        albumGenres!: AlbumGenre[];
}

