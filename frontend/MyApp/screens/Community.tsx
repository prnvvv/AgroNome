import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from './Navbar';

interface CommunityProps {
  onNavigate: (screen: string) => void;
}

interface User {
  id: string;
  name: string;
  description: string;
  verified?: boolean;
}

const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
  const [comment, setComment] = useState('');

  const users: User[] = [
    {
      id: '1',
      name: 'Mithil',
      description: 'I have experience in full-stack development and web apps',
      verified: true,
    },
    {
      id: '2',
      name: 'Pranav',
      description: 'Happy to contribute to the club!',
    },
    {
      id: '3',
      name: 'Hair',
      description: 'Participating in some tech activities',
    },
  ];

  const handlePostComment = () => {
    if (comment.trim()) {
      // Handle posting comment
      console.log('Posting comment:', comment);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title="Community" onNavigate={onNavigate} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User List */}
        <View style={styles.userList}>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={20} color="#666" />
                  </View>
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    {user.verified && (
                      <Ionicons name="leaf" size={16} color="#4CAF50" style={styles.verifiedIcon} />
                    )}
                  </View>
                  <Text style={styles.userDescription}>{user.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Comment Section */}
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity 
            style={styles.postButton}
            onPress={handlePostComment}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('Dashboard')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('CropCare')}
        >
          <Ionicons name="crop" size={24} color="#666" />
          <Text style={styles.navLabel}>Crop Care</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('MotorControl')}
        >
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Motor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#4A90E2" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('Trends')}
        >
          <Ionicons name="trending-up-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Trends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userList: {
    marginBottom: 30,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 6,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  userDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  commentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',
    marginBottom: 15,
    minHeight: 80,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#4A90E2',
  },
});

export default Community;