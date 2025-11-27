import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { Album } from './Album';
import { ArtistSong } from './ArtistSong';
import { Follower } from './Follower';

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn({ name: 'artist_id' })
        artistId!: number;

    @Column({ type: 'varchar', length: 150 })
        name!: string;

    @Column({ type: 'text', nullable: true })
        bio?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
        country?: string;

    @Column({ type: 'int', name: 'debut_year', nullable: true })
        debutYear?: number;

    @Column({ type: 'varchar', length: 500, name: 'profile_image_url', nullable: true })
        profileImageUrl?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @OneToMany(() => Album, album => album.artist)
        albums!: Album[];

    @OneToMany(() => ArtistSong, artistSong => artistSong.artist)
        artistSongs!: ArtistSong[];

    @OneToMany(() => Follower, follower => follower.artist)
        followers!: Follower[];
}

