import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { User } from './User';

export enum SubscriptionPlanType {
    FREE = 'Free',
    PREMIUM = 'Premium',
    FAMILY = 'Family',
}

export enum SubscriptionStatus {
    ACTIVE = 'Active',
    PAUSED = 'Paused',
    CANCELLED = 'Cancelled',
}

@Entity('subscriptions')
@Index(['userId'])
export class Subscription {
    @PrimaryGeneratedColumn({ name: 'subscription_id' })
        subscriptionId!: number;

    @Column({ type: 'int', name: 'user_id' })
        userId!: number;

    @Column({
        type: 'enum',
        enum: SubscriptionPlanType,
        name: 'plan_type',
    })
        planType!: SubscriptionPlanType;

    @Column({ type: 'timestamp', name: 'start_date' })
        startDate!: Date;

    @Column({ type: 'timestamp', name: 'end_date', nullable: true })
        endDate?: Date;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus,
    })
        status!: SubscriptionStatus;

    // Relationships
    @ManyToOne(() => User, user => user.subscriptions)
    @JoinColumn({ name: 'user_id' })
        user!: User;
}

