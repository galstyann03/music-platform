import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { Playlist } from './Playlist';
import { ListeningHistory } from './ListeningHistory';
import { Subscription } from './Subscription';
import { Like } from './Like';
import { Follower } from './Follower';
import { AdShownToUser } from './AdShownToUser';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
        userId!: number;

    @Column({ type: 'varchar', length: 100 })
        name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
        email!: string;

    @Column({ type: 'varchar', length: 255, name: 'password_hash' })
        passwordHash!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
        role!: UserRole;

    @Column({ type: 'date', name: 'birth_date', nullable: true })
        birthDate?: Date;

    @Column({ type: 'varchar', length: 500, name: 'profile_image_url', nullable: true })
        profileImageUrl?: string;

    @Column({ type: 'boolean', name: 'is_verified', default: false })
        isVerified!: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
        createdAt!: Date;

    // Relationships
    @OneToMany(() => Playlist, playlist => playlist.user)
        playlists!: Playlist[];

    @OneToMany(() => ListeningHistory, history => history.user)
        listeningHistories!: ListeningHistory[];

    @OneToMany(() => Subscription, subscription => subscription.user)
        subscriptions!: Subscription[];

    @OneToMany(() => Like, like => like.user)
        likes!: Like[];

    @OneToMany(() => Follower, follower => follower.user)
        followers!: Follower[];

    @OneToMany(() => AdShownToUser, adShownToUser => adShownToUser.user)
        adsShownToUser!: AdShownToUser[];
}

