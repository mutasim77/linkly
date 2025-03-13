<template>
  <div>
    <section class="py-12 relative overflow-hidden mb-12">
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_37%,var(--primary)/15%,transparent)]"></div>
      <div class="text-center max-w-3xl mx-auto px-4">
        <h1 class="text-4xl font-extrabold text-foreground sm:text-5xl animate-in-slide-up-fade">
          About <span class="text-primary bg-clip-text animate-gradient-x">Linkly</span>
        </h1>
        <p
          class="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-in-slide-up-fade [animation-delay:150ms]">
          A simple solution born from a common problem
        </p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto">
      <Card class="mb-10 p-7 overflow-hidden border border-border/50 shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-primary">
            <BookOpenIcon class="h-5 w-5" />
            The Story
          </CardTitle>
        </CardHeader>
        <CardContent class="pt-6">
          <div class="prose dark:prose-invert max-w-none">
            <div class="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
              <div class="bg-primary/10 text-primary rounded-full p-3 shrink-0">
                <UserIcon class="h-6 w-6" />
              </div>
              <p class="text-lg">
                <span class="text-2xl">👋</span> Hi there!
              </p>
            </div>

            <div class="relative pl-6 border-l-2 border-primary/30 mb-6">
              <h3 class="text-xl font-semibold text-foreground mb-3">The Problem</h3>
              <p>
                One day, I was sitting with a friend and we counted the tabs I had open: <strong>72 tabs!</strong> Each
                one contained important research, tutorials, documentation, and resources I needed. But my laptop was
                slowing down under the weight of all these open tabs.
              </p>
              <p>
                I tried using bookmarks, but they quickly became disorganized and hard to search through. I needed a
                better solution.
              </p>
            </div>

            <div class="relative pl-6 border-l-2 border-primary/30 mb-6">
              <h3 class="text-xl font-semibold text-foreground mb-3">The Solution: Linkly</h3>
              <p>
                That's why I created Linkly - a simple, elegant way to store and organize all the important links I come
                across. With Linkly, I can:
              </p>

              <ul class="space-y-2 my-4">
                <li class="flex items-start gap-2">
                  <CheckCircleIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Save links with descriptive names</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircleIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Organize them with custom tags</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircleIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Quickly search through my collection</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckCircleIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Access them from anywhere</span>
                </li>
              </ul>

              <p>
                Now I can keep my browser lean and my mind focused, knowing all my important resources are just a search
                away.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="mb-10 p-7 overflow-hidden border border-border/50 shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-primary">
            <CodeIcon class="h-5 w-5" />
            Technical Details
          </CardTitle>
        </CardHeader>
        <CardContent class="pt-6">
          <p class="mb-6 text-muted-foreground">
            Linkly is built with modern technologies for the best possible user experience:
          </p>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">⚡</div>
              <div class="font-medium text-foreground">Vue.js 3</div>
              <div class="text-xs text-muted-foreground">Composition API</div>
            </div>
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">🔒</div>
              <div class="font-medium text-foreground">TypeScript</div>
              <div class="text-xs text-muted-foreground">Type Safety</div>
            </div>
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">🎨</div>
              <div class="font-medium text-foreground">Tailwind CSS</div>
              <div class="text-xs text-muted-foreground">Styling</div>
            </div>
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">📦</div>
              <div class="font-medium text-foreground">Pinia</div>
              <div class="text-xs text-muted-foreground">State Management</div>
            </div>
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">🧩</div>
              <div class="font-medium text-foreground">Shadcn UI</div>
              <div class="text-xs text-muted-foreground">Components</div>
            </div>
            <div class="flex flex-col items-center bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div class="text-2xl mb-2">💾</div>
              <div class="font-medium text-foreground">LocalForage</div>
              <div class="text-xs text-muted-foreground">Storage</div>
            </div>
          </div>

          <div class="bg-muted/30 rounded-lg p-4 border border-border/50">
            <p class="text-sm">
              Linkly works entirely in your browser - no servers, no accounts, just a simple tool that helps you manage
              your digital knowledge.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="mb-10 p-7 overflow-hidden border border-border/50 shadow-md">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-primary">
            <RocketIcon class="h-5 w-5" />
            Future Plans
          </CardTitle>
        </CardHeader>
        <CardContent class="pt-6">
          <p class="mb-6 text-muted-foreground">
            The journey doesn't end here. I have exciting plans for Linkly's future:
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <PuzzleIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 class="font-medium text-foreground">Browser Extension</h4>
                <p class="text-sm text-muted-foreground">One-click saving directly from your browser</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <CloudIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 class="font-medium text-foreground">Cloud Sync</h4>
                <p class="text-sm text-muted-foreground">Optional cross-device access to your links</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <BookmarkIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 class="font-medium text-foreground">Reading List</h4>
                <p class="text-sm text-muted-foreground">Track read/unread status for your links</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
              <PencilIcon class="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 class="font-medium text-foreground">Notes and Highlights</h4>
                <p class="text-sm text-muted-foreground">Add personal notes to your saved links</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="text-center py-8">
        <p class="text-sm font-medium text-foreground">
          Linkly is and always will be a tool built by a learner, for learners
          <HeartIcon class="inline h-4 w-4 text-primary animate-ping" />
        </p>
        <Button as-child class="mt-8 gap-2">
          <router-link to="/">
            <ArrowLeftIcon class="h-4 w-4" />
            Back to Links
          </router-link>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpenIcon,
  UserIcon,
  CheckCircleIcon,
  CodeIcon,
  RocketIcon,
  HeartIcon,
  ArrowLeftIcon,
  PuzzleIcon,
  CloudIcon,
  BookmarkIcon,
  PencilIcon,
  BrainCircuitIcon
} from 'lucide-vue-next';
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>