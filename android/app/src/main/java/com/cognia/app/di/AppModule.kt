package com.cognia.app.di

import android.content.Context
import com.cognia.app.data.collector.NetworkCollector
import com.cognia.app.data.collector.UsageCollector
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideUsageCollector(@ApplicationContext context: Context): UsageCollector {
        return UsageCollector(context)
    }

    @Provides
    @Singleton
    fun provideNetworkCollector(@ApplicationContext context: Context): NetworkCollector {
        return NetworkCollector(context)
    }
}
