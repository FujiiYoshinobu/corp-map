'use client';

import { useState } from 'react';
import Link from 'next/link';
import { storyRegistry } from '@/processes/storybook';

const grouped = storyRegistry.reduce<Record<string, typeof storyRegistry>>((acc, story) => {
  acc[story.group] = acc[story.group] ?? [];
  acc[story.group].push(story);
  return acc;
}, {});

const groupEntries = Object.entries(grouped);

export default function StorybookPage() {
  const [activeStoryId, setActiveStoryId] = useState(groupEntries[0]?.[1][0]?.id ?? '');
  const activeStory = storyRegistry.find((story) => story.id === activeStoryId);

  return (
    <div className="flex min-h-screen bg-surface text-slate-100">
      <aside className="w-72 border-r border-outline/40 bg-[#10172d] p-6">
        <Link href="/" className="block text-sm text-slate-400 hover:text-accent">
          ← 戻る
        </Link>
        <h1 className="mt-4 text-xl font-semibold">CorpMap Storybook</h1>
        <nav className="mt-6 space-y-4">
          {groupEntries.map(([group, stories]) => (
            <div key={group}>
              <h2 className="text-xs uppercase tracking-wider text-slate-500">{group}</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {stories.map((story) => (
                  <li key={story.id}>
                    <button
                      type="button"
                      onClick={() => setActiveStoryId(story.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                        activeStoryId === story.id
                          ? 'bg-accent/20 text-sky-200'
                          : 'text-slate-300 hover:bg-surface/80'
                      }`}
                    >
                      {story.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto bg-gradient-to-b from-[#0b1120] to-[#111c34] p-10">
        {activeStory ? (
          <div className="rounded-3xl border border-outline/40 bg-surface/70 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-sky-100">{activeStory.title}</h2>
            <div className="mt-6">{activeStory.render()}</div>
          </div>
        ) : (
          <div className="text-slate-400">ストーリーが見つかりません。</div>
        )}
      </main>
    </div>
  );
}
